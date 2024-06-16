# Ceezer | Portfolio Generation

## Setup

### Spinning up the database
The database is set up in a Dockerfile with automized Schema initialization.
However, raw data is excluded to protect potentially confidential data. 

Add the projects data file to `api/database` as `projects.csv`

```
cd api/database
docker build -t ceezer-psql .
docker run --rm --name ceezer-psql -p 6666:5432 -d ceezer-psql
```

Following, PSQL is exposed on port 6666 to avoid conflicts with local postgres installations.
Notice, that PSQL credentials are not secure, as this is a development environment.

The connection config is exceptionally git-included in the `api/.env` file.

### Setting up and running API and Frontend

```
cd api && yarn install && yarn run start
cd app && yarn install && yarn run start
```

## Thoughts while the task
### Unclearances
- Does "total distribution weights" equal to all projects in DB or to the sum of distribution weight of selected projects in a portfolio?
- Example doesn't incorporate role of "total distribution weights"
- What shall fractional handling be simplified to?
- Can the total distribution as per the sum of all projects in DB exceed 1?
- Are "Credits" referring to tons per project? 

### Assumption
These assumptions guided me while building the solution.
- Concluding from the example: total distribution weights equals to all projects. 
    - Without fractional handling all projects would be returned
    - Since we use fractional handling projects are returned when allocation is higher than 0.5 (`Math.floor`)
- "Credits" from the explanation are the same as "tons"
- Prize is excluded as determinator for the algorithm

> **Goal**: Maximize the total tonnage respecting distribution weights of projects and the total upper-bound of  desired tonnage

### Solution
- Calculate the ideal allocation of tonnage per project
- Compensate shortfallings by recursively calling the function with the penalized volume, calculated as ![Calculation](https://latex.codecogs.com/svg.image?\left\lfloor&space;offeredVolumeInTons\div&space;distributionWeight\right\rfloor)

Time complexity: 
- Best: `O(n)`[^1]         
- Worst: `O(n*log(n))`[^2]

### Limitations
I focused my energy on understanding the task definition of  and continuing with assumptions (we all deserve a weekend ;)) and elaborated a constrainted solution by myself. This manifests especially in the definition of total distribution weights. Finally with more time the implementation can be improved by error handling of database connection in the api and enhancing the frontend with loading components and a not found component.

[^1]: If desired volume is covered by the local distribution weight upper-bound of projects
[^2]: If desired volume exceeds local distribution weight upper-bound of projects, the algorithm reruns `log(n)` times