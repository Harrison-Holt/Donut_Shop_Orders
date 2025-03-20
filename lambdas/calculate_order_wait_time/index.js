export const handler = async (event) => {
  console.log("🔹 Received Event:", JSON.stringify(event, null, 2));

  const quantity = event.Payload.body.quantity;
  console.log(quantity); 

  if (!quantity) {
    console.error("No Quantity Found!");
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "No Quantity Found!" })
    };
  }

  const base_time = 5;
  const wait_time = base_time + quantity;
  console.log(wait_time);

  return {
    statusCode: 200,
    body: {
      message: "Calculated Wait Time!",
      wait_time: wait_time
    }
  };
};
