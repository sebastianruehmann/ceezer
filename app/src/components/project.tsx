import { FC } from "react";
import Image from "next/image";
import { Card, Inset, Text, Heading, Box, Badge, DataList, Separator } from "@radix-ui/themes";

export interface ProjectProps {
  name: string;
  country: string;
  image: string;
  price_per_ton: number;
  offered_volume_in_tons: number;
  distribution_weight: number;
  supplier_name: string;
  earliest_delivery: string;
  description: string;
  allocation: number;
};

const Project: FC<ProjectProps> = ({
  name,
  country,
  image,
  offered_volume_in_tons,
  price_per_ton,
  supplier_name,
  distribution_weight,
  description,
  allocation,
}) => {
  return (
    <Card>
      <Inset clip="padding-box" side="top" pb="current">
        <Image src={image} alt={name} width={940} height={705} style={{
            display: 'block',
            objectFit: 'cover',
            width: '100%',
            height: 140,
            backgroundColor: 'var(--gray-5)',
          }}
        />
      </Inset>
      <Heading>{name} | {supplier_name}</Heading>
      <Box><Badge>{country}</Badge></Box>
      <Box py="2">
        <DataList.Root>
          <DataList.Item>
            <DataList.Label minWidth="88px">Allocated Credits</DataList.Label>
            <DataList.Value>
              {allocation} tons
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">Offered Volume</DataList.Label>
            <DataList.Value>
              {offered_volume_in_tons} tons
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">Share</DataList.Label>
            <DataList.Value>
              {distribution_weight * 100}%
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">Price</DataList.Label>
            <DataList.Value>
              {price_per_ton}€ per ton
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>
      </Box>
      <Text>{description}</Text>
    </Card>
  )
}

export default Project;