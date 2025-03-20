import { EventBridgeClient, PutEventsCommand } from "@aws-sdk/client-eventbridge"

const event_bridge = new EventBridgeClient({ region: 'us-east-1' }); 

export const handler = async(event) => {

    console.log("New Version!. Testing Pipeline!"); 
    
    console.log("Received event: ", event); 

    try {

    if(event.httpMethod !== 'POST') {
        
        return {
            statusCode: 405, 
            body: JSON.stringify({ message: 'Only POST Method Allowed'})
        }
    }

    const { donut_type, quantity } = JSON.parse(event.body); 

    if(!donut_type || !quantity) {
        return {
            statusCode: 400, 
            body: JSON.stringify({ message: 'Invalid Order! Please Order Again!' })
        }
    }

    const parameters = {
        Entries: [
            {
            Source: 'order.service', 
            DetailType: 'OrderPlaced', 
            Detail: JSON.stringify({
                order_id: `order-${Date.now()}`, 
                donut_type, 
                quantity
            }), 
            EventBusName: 'Donut_Orders'
            }
        ]
    }

    const command = new PutEventsCommand(parameters); 
    const response = await event_bridge.send(command); 

    console.log('Order Validated Successfully!', response); 

    return {
        statusCode: 200, 
        body: JSON.stringify({ message: `Order Placed Successfully!`, order_id: parameters.Entries[0].Detail.order_id})
    }
    
    } catch(error) {
        console.error('Error Sending Order!', error.message); 
        return {
            statusCode: 500, 
            body: JSON.stringify({ message: 'Internal Server Error', error })
        }
    }
}