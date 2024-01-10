import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createUser, deleteUser, updateUser } from "@/lib/actions/user.action";
import { NextResponse } from "next/server";

export async function GET() {
  return new Response("GET ESTA BIEN", {
    status: 200,
  });
}

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  //TODO: Add your webhook secret to .env.local
  const WEBHOOK_SECRET = process.env.NEXT_CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  console.log("antes del body");
  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);
  console.log(`body is ${body}`);
  console.log("svix-id: " + svix_id);
  console.log("svix-timestamp" + svix_timestamp);
  console.log("svix-signature" + svix_signature);
  console.log("SECRTET IS " + WEBHOOK_SECRET);
  // Create a new Svix instance with your secret.
  console.log("before wh");
  const wh = new Webhook(WEBHOOK_SECRET);
  console.log("after wh");

  console.log("wh is " + wh);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    console.log("starts evt");
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
    console.log("finishes evt");
  } catch (err) {
    console.log("Enter to error in evt");
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  console.log("gets after evt which value is: " + evt);

  // Get the ID and type
  const { id } = evt.data;
  console.log("Id is: " + id);

  const eventType = evt.type;
  console.log("event type is: " + eventType);

  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  console.log("Webhook body:", body);

  if (eventType === "user.created") {
    const { id, email_addresses, image_url, first_name, last_name, username } =
      evt.data;
    //create a new user in DB
    const mongoUser = await createUser({
      clerkId: id,
      name: `${first_name}${last_name ? ` ${last_name}` : ""}`,
      email: email_addresses[0].email_address,
      picture: image_url,
      username: username!,
    });

    console.log(`Mongo user is ${JSON.stringify(mongoUser)}`);

    return NextResponse.json({ message: "OK", user: mongoUser });
  }

  if (eventType === "user.updated") {
    const { id, email_addresses, image_url, first_name, last_name, username } =
      evt.data;
    //create a new user in DB
    const mongoUser = await updateUser({
      clerkId: id,
      updateData: {
        name: `${first_name}${last_name ? ` ${last_name}` : ""}`,
        email: email_addresses[0].email_address,
        picture: image_url,
        username: username!,
      },
      path: `/profile/${id}`,
    });

    return NextResponse.json({ message: "OK", user: mongoUser });
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;
    const deletedUser = await deleteUser({ clerkId: id! });

    return NextResponse.json({ message: "OK", user: deletedUser });
  }

  return new Response("", { status: 201 });
}
