import { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useAnimation, PanInfo } from 'framer-motion';
import { Card, Text, Badge, Button, Group, Loader, Anchor, Avatar, Image, Flex } from '@mantine/core';
import { useSingleEffect } from "react-haiku";

import { FormattedRepoData, getRandomRepository, saveProject } from './SwipeCard.service';

import bg from '../../assets/cardbg.svg'
import './swipeCard.scss';

const SwipeCard = () => {
  const x = useMotionValue(0);
  const tilt = useTransform(x, [-50, 0, 50], [-3, 0, 3]); // Tilt effect based on x position
  const controls = useAnimation();
  const cardRef = useRef<HTMLDivElement>(null);

  const [dragDirection, setDragDirection] = useState<'left' | 'right' | null>(null);
  const [dragDistance, setDragDistance] = useState(0);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<FormattedRepoData>();

  const handleDragConstraints = (x: number) => Math.min(Math.max(x, -50), 50);

  const handleDragEnd = () => {
    const xPosition = handleDragConstraints(x.get()); // Get the current position using x.get()
    if (xPosition === -50) {
      getFormattedRepoData();
    }

    if (xPosition === 50) {
      saveProject('matches', data);
      getFormattedRepoData();
    }

    // Animate the card back to the initial position
    setDragDirection(null);
    controls.start({ x: 0 });
  };

  const handleDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setDragDistance(info.offset.x);
    info.offset.x > 0 ? setDragDirection('right') : setDragDirection('left');
  };

  const getFormattedRepoData = () => {
    setLoading(true);

    getRandomRepository().then((data) => {
      const { id, html_url, name, description } = data.repository;
      const { avatar_url, login } = data.repository.owner;
      const totalOpenIssues = data.totalOpenIssues;

      setData({ id, html_url, name, description, avatar_url, login, totalOpenIssues })

      setTimeout(() => {
        setLoading(false);
      }, 500);
    });
  }

  useSingleEffect(() => {
    getFormattedRepoData();
  });

  return (
    <div className='swipe-card-container'>
      <motion.div
        drag="x"
        ref={cardRef}
        dragConstraints={{ left: -50, right: 50 }}
        onDragEnd={handleDragEnd}
        onDrag={handleDrag}
        style={{
          cursor: 'grab',
          rotate: tilt,
          x,
        }}
        animate={controls}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <Card className='swipe-card' shadow="xl" w={400} h={400} padding="lg" radius="md" withBorder>
          {!loading && data && (
            <div className='card-details'>
              <Image
                src={bg}
                height={160}
                className='card-img'
                alt="GitHub User Avatar"
                draggable={false}
              />
              <Group className='card-user'>
                <Avatar className='avatar' draggable={false} src={data.avatar_url} size='lg' />
                <Flex direction='column' ml='xs'>
                  <Text size='md' mb={0} fw={600}>Made By</Text>
                  <Text size='xs' fw={500}>{data.login}</Text>
                </Flex>
              </Group>
              <Group justify="space-between" align='center' mb="xs" mt="sm">
                <Text size='xl' fw={800}>{data.name}</Text>
                <Badge color="black">
                  {data.totalOpenIssues ? `${data?.totalOpenIssues} ${data.totalOpenIssues === 1 ? 'Issue' : 'Issues'}` : '0 Issues'}
                </Badge>
              </Group>

              <Text size="sm" c="dimmed">
                {data.description}
              </Text>

              <Anchor href={data.html_url} target="_blank" mt="auto" underline='never'>
                <Button color="black" fullWidth radius="md">
                  View On GitHub
                </Button>
              </Anchor>
            </div>
          )}
          {loading && (
            <Loader className='card-loader' size='lg' color='grape' />
          )}
        </Card>
      </motion.div>
      <motion.div
        style={{
          position: 'fixed',
          zIndex: '10',
          top: '50%',
          left: '48%',
          transform: 'translate(-50%, -50%)',
          opacity: dragDirection === 'left' ? Math.abs(dragDistance / 150) : 0,
          scale: dragDirection === 'left' ? Math.abs(dragDistance / 150) : 0,
        }}
      >
        <i className='fa fa-times-circle swipe-icon nope'></i>
      </motion.div>
      <motion.div
        style={{
          position: 'fixed',
          zIndex: '10',
          top: '50%',
          left: '48%',
          transform: 'translate(-50%, -50%)',
          opacity: dragDirection === 'right' ? Math.abs(dragDistance / 100) : 0,
          scale: dragDirection === 'right' ? Math.abs(dragDistance / 100) : 0,
        }}
      >
        <i className='fa fa-heart swipe-icon heart'></i>
      </motion.div>

      <div className='action-buttons'>
        <Button id='like-button' variant="outline" size="xl" aria-label="Like" onClick={() => {
          saveProject('matches', data);
          getFormattedRepoData();
        }}>
          <i className='fa fa-times-circle'></i>
        </Button>
        <Button id='nope-button' variant="outline" size="xl" aria-label="Nope" onClick={() => getFormattedRepoData()}>
          <i className='fa fa-heart'></i>
        </Button>
      </div>
    </div>
  );
};

export default SwipeCard;
