const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();
const pool = require('./db');

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

(async () => {
    const { customAlphabet } = (await import('nanoid'));
    const nanoid10 = customAlphabet('0123456789', 10);

    // Sample hardcoded account data with accountId as the first property
    const defaultAccounts = [
        {
            accountId: nanoid10(),
            fromDate: '2023-01-01',
            toDate: '2023-12-31',
            firstName: 'John',
            lastName: 'Doe',
            address: '123 Main St',
            city: 'Springfield',
            state: 'IL',
            zipCode: '62701',
            accountType: 'savings'
        },
        {
            accountId: nanoid10(),
            fromDate: '2023-02-01',
            toDate: '2023-12-31',
            firstName: 'Jane',
            lastName: 'Smith',
            address: '456 Oak Ave',
            city: 'Greenville',
            state: 'CA',
            zipCode: '95947',
            accountType: 'checkings'
        },
        {
            accountId: nanoid10(),
            fromDate: '2023-03-15',
            toDate: '2023-12-31',
            firstName: 'Alice',
            lastName: 'Johnson',
            address: '789 Pine Rd',
            city: 'Centerville',
            state: 'TX',
            zipCode: '75833',
            accountType: 'brokerage'
        },
        {
            accountId: nanoid10(),
            fromDate: '2023-04-10',
            toDate: '2023-12-31',
            firstName: 'Bob',
            lastName: 'Williams',
            address: '321 Maple St',
            city: 'Fairview',
            state: 'OH',
            zipCode: '44126',
            accountType: 'savings'
        },
        {
            accountId: nanoid10(),
            fromDate: '2023-05-20',
            toDate: '2023-12-31',
            firstName: 'Carol',
            lastName: 'Davis',
            address: '654 Cedar Ave',
            city: 'Lakewood',
            state: 'CO',
            zipCode: '80226',
            accountType: 'checkings'
        },
        {
            accountId: nanoid10(),
            fromDate: '2023-06-01',
            toDate: '2023-12-31',
            firstName: 'Eve',
            lastName: 'Martinez',
            address: '987 Birch Blvd',
            city: 'Riverside',
            state: 'CA',
            zipCode: '92501',
            accountType: 'brokerage'
        }
    ];

    let accounts = defaultAccounts;

    // GET /accounts - return all accounts
    app.get('/accounts', async (req, res) => {
        try {
            const [rows] = await pool.query('SELECT * FROM accounts');
            if (rows.length > 0) {
                console.log('[DB] Returning accounts from database');
                return res.json(rows);
            } else {
                console.log('[Fallback] No accounts in database, using in-memory array');
                return res.json(accounts);
            }
        } catch (err) {
            console.error('[DB ERROR] Falling back to in-memory array:', err);
            return res.json(accounts);
        }
    });

    // POST /accounts - create a new account
    app.post('/accounts', async (req, res) => {
        const { firstName, lastName, address, city, state, zipCode, accountType } = req.body;
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const fromDate = `${yyyy}-${mm}-${dd}`;
        const toDate = `${yyyy}-12-31`;
        const newAccount = {
            accountId: nanoid10(),
            fromDate,
            toDate,
            firstName,
            lastName,
            address,
            city,
            state,
            zipCode,
            accountType
        };
        try {
            await pool.query(
                'INSERT INTO accounts (accountId, fromDate, toDate, firstName, lastName, address, city, state, zipCode, accountType) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    newAccount.accountId,
                    newAccount.fromDate,
                    newAccount.toDate,
                    newAccount.firstName,
                    newAccount.lastName,
                    newAccount.address,
                    newAccount.city,
                    newAccount.state,
                    newAccount.zipCode,
                    newAccount.accountType
                ]
            );
            console.log('[DB] Inserted new account into database');
            return res.status(201).json(newAccount);
        } catch (err) {
            console.error('[DB ERROR] Falling back to in-memory array:', err);
            accounts.push(newAccount);
            return res.status(201).json(newAccount);
        }
    });

    // GET /accounts/:accountId - return account by ID
    app.get('/accounts/:accountId', async (req, res) => {
        const { accountId } = req.params;
        try {
            const [rows] = await pool.query('SELECT * FROM accounts WHERE accountId = ?', [accountId]);
            if (rows.length > 0) {
                console.log(`[DB] Returning account ${accountId} from database`);
                return res.json(rows[0]);
            } else {
                console.log(`[Fallback] Account ${accountId} not found in database, using in-memory array`);
                const account = accounts.find(a => a.accountId === accountId);
                if (!account) {
                    return res.status(404).json({ message: 'Account not found' });
                }
                return res.json(account);
            }
        } catch (err) {
            console.error(`[DB ERROR] Falling back to in-memory array for account ${accountId}:`, err);
            const account = accounts.find(a => a.accountId === accountId);
            if (!account) {
                return res.status(404).json({ message: 'Account not found' });
            }
            return res.json(account);
        }
    });

    // Basic route
    app.get('/', (req, res) => {
        res.json({ message: 'Welcome to the API' });
    });

    // Error handling middleware
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({ message: 'Something went wrong!' });
    });

    // Start server
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})(); 