"use client";

import Project, { ProjectProps } from "@/components/project";
import { useState, FormEvent, useMemo } from "react";
import { TextField, Button, Flex, Text, Box, Grid, DataList, Callout } from "@radix-ui/themes";

export default function Portfolio() {
  const [desiredVolume, setDesiredVolume] = useState<number>(100);
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [error, setError] = useState<boolean>(false);
  
  const generatePortfolio = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/projects/${desiredVolume}`);
      if (!response.ok) {
        setError(true)
        return;
      }
      setError(false);
      setProjects(await response.json());
    } catch (error) {
      setError(true);
    }
  };

  const totalAllocatedTons = useMemo(() => {
    return projects.reduce((acc, project) => acc + project.allocation, 0);
  }, [projects]);

  const totalPrice = useMemo(() => {
    return projects.reduce((acc, project) => acc + project.allocation * project.price_per_ton, 0);
  }, [projects]);

  return (
    <div>
      <Text>Create your carbon credit portfolio by entering your desired volume in tons of carbon credits.</Text>
      <Box py="2">
        <form onSubmit={generatePortfolio}>
          <Flex gap="3">
            <TextField.Root size="3" type="number" onChange={e => setDesiredVolume(e.target.value)} value={desiredVolume} >
              <TextField.Slot>Desired Volume</TextField.Slot>
            </TextField.Root>
            <Button type="submit" size="3">
              Generate Portfolio
            </Button>
          </Flex>
        </form>
      </Box>
      {totalAllocatedTons != 0 && (
        <Flex gap="6" py="2" justify="end">
          <DataList.Root>
            <DataList.Item>
              <DataList.Label minWidth="88px">Total Credits</DataList.Label>
              <DataList.Value>
                {totalAllocatedTons}
              </DataList.Value>
            </DataList.Item>
          </DataList.Root>
          <DataList.Root>
            <DataList.Item>
              <DataList.Label minWidth="88px">Total Price</DataList.Label>
              <DataList.Value>
                {totalPrice}€
              </DataList.Value>
            </DataList.Item>
          </DataList.Root>
        </Flex>
      )}
      {error && (
        <Box py="2">
          <Callout.Root color="red">
            <Callout.Text>
              While generating the portfolio, an error occurred. Please try again.
            </Callout.Text>
          </Callout.Root>
        </Box>
      )}
      <Grid columns="3" gap="3" rows="repeat(2)" width="auto">
        {projects.map((project: ProjectProps) => (
          <Project {...project} />
        ))}
      </Grid>
    </div>
  )
}