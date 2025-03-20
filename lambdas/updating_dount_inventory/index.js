import { DynamoDBClient, GetItemCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

const dynamodb = new DynamoDBClient({ region: 'us-east-1' }); 

export const handler = async(event) => {

    console.log(event); 
    
    const { order_id, donut_type, quantity } = event; 

    if(!order_id || !donut_type || !quantity) {
        return {
            statusCode: 400, 
            body: JSON.stringify({ message: 'Invalid Event!' })
        }
    }

    try {

        const stock_data = await dynamodb.send(new GetItemCommand({
            TableName: "Donut_Inventory", 
            Key: { "donut_type": { S: donut_type }}
        })); 

        const available_stock = parseInt(stock_data?.Item?.available_stock?.N); 

        if(available_stock < quantity) {
            return {
                statusCode: 400, 
                body: JSON.stringify({ message: 'Not Enough Stock!' })
            }
        }
        
        await dynamodb.send(new UpdateItemCommand({
            TableName: 'Donut_Inventory', 
            Key: { "donut_type": { S: donut_type }}, 
            UpdateExpression: 'SET available_stock = :newStock', 
            ExpressionAttributeValues: { ':newStock': { N: (available_stock - quantity).toString() }}
        })); 

        return {
            statusCode: 200, 
            body: {
                message: 'Donut Inventory Updated Successfully!', 
                order_id,
                donut_type, 
                quantity
            }
        }
    } catch(error) {
        console.error('Error Updating Inventory!', error.message); 
        return {
            statusCode: 500, 
            body: JSON.stringify({ message: 'Internal Server Error' })
        }
    }
}