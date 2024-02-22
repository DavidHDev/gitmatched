import { Anchor, Badge, Button, Card, Flex, Group, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';

import './matches.scss';

interface Item {
  totalOpenIssues: number;
  html_url: string,
  id: number;
  name: string;
  description: string;
}

const Matches: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    refreshItems();
  }, []);

  const refreshItems = () => {
    const storedItems = JSON.parse(localStorage.getItem('matches') || '[]');
    setItems(storedItems);
  };

  const handleRemoveItem = (id: number) => {
    const updatedItems = items.filter(item => item.id !== id);
    localStorage.setItem('matches', JSON.stringify(updatedItems));
    refreshItems();
  };

  return (
    <div className='matches-container'>
      <Text fw={600} size='xl' mb='md'>Your Liked Projects</Text>
      <Flex gap={20} className='matches-cards' wrap="wrap">
        {items.map((item) => (
          <Card key={item.id} className='match-card' w={300} shadow="sm" padding="lg" mb='md' radius="lg" withBorder>
            <Group justify='space-between' align='center'>
              <strong>{item.name}</strong>
              <Badge color="black">
                {item.totalOpenIssues} <i className='fa fa-triangle-exclamation'></i>
              </Badge>
            </Group>

            <Anchor href={item.html_url} target='_blank' underline='never'>
              <Button variant="filled" radius="md" color='black' fullWidth onClick={() => handleRemoveItem(item.id)} mt='lg'>
                <Text fw={500} size='sm'>View On GitHub</Text>
              </Button>
            </Anchor>

            <Button variant="light" radius="md" color='red' onClick={() => handleRemoveItem(item.id)} mt='sm'>
              <i className='fa fa-trash'></i>
              <Text fw={500} ml='sm' size='sm'>Unmatch</Text>
            </Button>
          </Card>

        ))}
        {!items.length && (
          <Text c="dimmed">No Likes Yet</Text>
        )}
      </Flex>
    </div>
  );
};

export default Matches;