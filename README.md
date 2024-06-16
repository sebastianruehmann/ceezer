# Spin up database

Add projects file to api/database as projects.csv

cd api/database
docker build -t ceezer-psql .
docker run --rm --name ceezer-psql -p 6666:5432 -d ceezer-psql

PSQL is exposed on port 6666 to avoid conflicts with local postgres installations.
Notice, that PSQL credentials are not secure, as this is a development environment.

Config is in the api/.env file.

Unclearances: 
- Can project tonnages be partly used (total vs volume)?
- Does "total distribution weights" equal to all projects in DB or to the sum of distribution weight of selected projects in a portfolio?
- Example doesn't incorporate role of "total distribution weights"

Assumption: 
- Concluding from the example: total distribution weights equals to all projects. Therefore with the given dataset (distribution weight sum <= 1) we return all projects. (Suggest term "single project" refers to "any" in 3. explanation)
- "Credits" from the explanation are the same as "Tons"

Analysis: Maximize the total tonnage respecting the upper-bound of the desired tonnage
(Prize excluded since it was not mentioned in explanation)

Solution:
- Calculate the ideal allocation of tonnage per project
- Compensate shortfallings by 



