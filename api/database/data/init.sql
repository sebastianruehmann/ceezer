CREATE TABLE projects (
    id SERIAL PRIMARY KEY,                          -- Unique identifier for each project
    name VARCHAR(255) NOT NULL,                     -- Name of the project
    country VARCHAR(100),                           -- Country where the project is located
    image TEXT,                                     -- URL to an image of the project
    price_per_ton NUMERIC(10, 2) NOT NULL,          -- Price per ton of credits
    offered_volume_in_tons NUMERIC(10, 2) NOT NULL, -- Total volume of tons offered
    distribution_weight NUMERIC(10, 2) NOT NULL,    -- Distribution weight of the project
    supplier_name VARCHAR(255),                     -- Name of the supplier
    earliest_delivery DATE,                         -- Earliest delivery date
    description TEXT                                -- Description of the project
);

COPY projects(id, name, country, image, price_per_ton, offered_volume_in_tons, distribution_weight, supplier_name, earliest_delivery, description)
FROM '/docker-entrypoint-initdb.d/projects.csv' DELIMITER ',' CSV HEADER;