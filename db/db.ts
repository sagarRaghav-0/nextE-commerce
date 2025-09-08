import postgres from 'postgres'

export  const sql = postgres({
    host: 'db.uskmnrcplvfskbrduxzh.supabase.co',
    port: 5432,
    database: 'postgres',
    username: 'postgres',
    password: 'Vi_ls_100'
})