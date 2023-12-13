
SQL Sample Queries

CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    customer_username VARCHAR(255) NOT NULL,
    seller_username VARCHAR(255) NOT NULL,
    payment_timestamp TIMESTAMP NOT NULL,
    session_start_timestamp TIMESTAMP,
    session_start BOOLEAN NOT NULL,
    amount INT NOT NULL
);

INSERT INTO payments (customer_username, seller_username, payment_timestamp, session_start_timestamp, session_start, amount)
VALUES
    ('apekshawwwww', 'rip_ballball', '2023-08-27 10:00:00', '2023-08-27 09:45:00', TRUE, 150)


Thots:

1. Coversastrion id present in chatgptpy could reduce reupload data.