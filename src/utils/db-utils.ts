export const getConnectionDBUrl = () => 
    `mongodb+srv://${process.env.DB_USER1}:${process.env.DB_PASSWORD1}@cluster0.hhgpert.mongodb.net/${process.env.DB_NAME}`;