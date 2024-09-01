// import type { Config } from 'drizzle-kit';
// import * as dotenv from 'dotenv';
// dotenv.config({ path: ".env" });

// const config: Config = {
//     driver: 'pg',
//     schema: './src/lib/db/schema.ts',
//     dbCredentials: {
//         connectionString: process.env.DATABASE_URL!,
//     },
// };

// export default config;

import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config({ path: ".env" });

const config: Config = {
    dialect: 'postgresql', // or 'mysql', 'sqlite' depending on your database
    schema: './src/lib/db/schema.ts',
    dbCredentials: {
        url: process.env.DATABASE_URL!, // updated from connectionString to url
    },
};

export default config;
