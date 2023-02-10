Mongo db params: 

db.createCollection('JSONS', 
    {validator: 
        {$jsonSchema: 
            {bsonType: 'object',
                required: ['route', 'JSON'],
                    properties: {
                        route: {
                            bsonType: 'string'
                        },
                        JSON: {
                            bsonType: 'array'
                        }
                    }}},
    validationAction: 'error'
                })
           
           
           
db.JSONS.createIndex( { "route": 1 }, { unique: true } )                  
