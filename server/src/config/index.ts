export default () => ({
    port: process.env.PORT,
    
    // deployed db url
    db_url: process.env.DB_URL,

    db_host: process.env.DB_HOST,
    db_port: process.env.DB_PORT,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,
    db: process.env.DB
})