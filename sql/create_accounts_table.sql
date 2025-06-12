CREATE TABLE IF NOT EXISTS accounts (
    accountId VARCHAR(20) PRIMARY KEY,
    fromDate DATE NOT NULL,
    toDate DATE NOT NULL,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    zipCode VARCHAR(20) NOT NULL,
    accountType ENUM('savings', 'checkings', 'brokerage') NOT NULL
); 