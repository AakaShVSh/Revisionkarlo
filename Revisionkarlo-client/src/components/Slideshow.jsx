import {
  Box,
  Flex,
  Image,
  Heading,
  Text,
  Button,
  Stack,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";

const EduHeroCarousel = ({ scrollToSubjects }) => {
  /* ================= SLIDES DATA ================= */
  const slides = [
    {
      img: "https://res.cloudinary.com/dmg0guany/image/upload/v1734874571/df7vcrrsru2etwqefmxa.jpg",
      title: "Crack Competitive Exams Faster 🚀",
      desc: [
        "Practice with real exam-level mock tests & PYQs",
        "Analyze performance with smart reports",
        "Boost accuracy, speed & confidence daily",
      ],
    },
    {
      img: "https://res.cloudinary.com/dmg0guany/image/upload/v1734874560/csindrazgawkc3fikmme.jpg",
      title: "Daily Practice. Real Progress.",
      desc: [
        "Solve topic-wise & section-wise questions",
        "Identify weak areas instantly",
        "Track improvement every single day",
      ],
    },
    {
      img: "https://res.cloudinary.com/dmg0guany/image/upload/v1734874526/u8egidighnwgwgmxoo2y.jpg",
      title: "Your Selection Journey Starts Here",
      desc: [
        "Reasoning, Maths, English & General Studies",
        "Full-length mock tests like real exams",
        "Everything you need in one smart platform",
      ],
    },
  ];

  /* ================= STATE ================= */
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  /* ================= CONTROLS ================= */
  const nextSlide = () =>
    setCurrent((s) => (s === slides.length - 1 ? 0 : s + 1));

  const startAuto = () => {
    intervalRef.current = setInterval(nextSlide, 3500);
  };

  const stopAuto = () => {
    clearInterval(intervalRef.current);
  };

  /* ================= AUTO SLIDE ================= */
  useEffect(() => {
    startAuto();
    return stopAuto;
  }, []);

  /* ================= SLIDER STYLE ================= */
  const carouselStyle = {
    display: "flex",
    transition: "transform 0.6s ease",
    transform: `translateX(-${current * 100}%)`,
  };

  /* ================= UI ================= */
  return (
    <Flex
      w="95%"
      m="auto"
      // mt={12}
      p={{ base: 5, md: 12 }}
      gap={12}
      direction={{ base: "column", md: "row" }}
      align="center"
      bg="gray.50"
      borderRadius="20px"
      onMouseEnter={stopAuto}
      onMouseLeave={startAuto}
    >
      {/* ================= LEFT SIDE ================= */}
      <Flex
        flex="1"
        direction="column"
        display={{ base: "none", md: "flex", lg: "flex" }}
      >
        {/* Small Tagline */}
        <Text
          fontSize="3xl"
          fontWeight="bold"
          color="blue.500"
          letterSpacing="1px"
          mb={2}
        >
          INDIA'S SMART EXAM PREPARATION PLATFORM
        </Text>

        {/* Main Heading */}
        <Heading fontSize={{ base: "2xl", md: "4xl" }} mb={5}>
          {slides[current].title}
        </Heading>

        {/* 3-Line Description */}
        <Stack spacing={2} mb={8} color="gray.600" fontSize="lg">
          {slides[current].desc.map((line, i) => (
            <Text key={i}>✔ {line}</Text>
          ))}
        </Stack>

        {/* Buttons */}
        <Stack direction={{ base: "column", sm: "row" }} spacing={4}>
          <Button colorScheme="blue" size="lg" onClick={scrollToSubjects}>
            Start Test
          </Button>
        </Stack>
      </Flex>

      {/* ================= RIGHT SIDE SLIDER ================= */}
      <Box
        flex="1"
        overflow="hidden"
        borderRadius="16px"
        h={{ base: "250px", md: "420px", lg: "auto" }}
        w="full"
        boxShadow="xl"
      >
        <Flex {...carouselStyle}>
          {slides.map((item, i) => (
            <Box key={i} flex="none" w="100%">
              <Image
                src={item.img}
                objectFit="cover"
                w="100%"
                h="100%"
                draggable="false"
              />
            </Box>
          ))}
        </Flex>
      </Box>

      {/* ================= DOTS ================= */}
      <Flex
        position="absolute"
        bottom="15px"
        left="50%"
        transform="translateX(-50%)"
        gap={2}
      >
        {slides.map((_, i) => (
          <Box
            key={i}
            w="10px"
            h="10px"
            borderRadius="full"
            cursor="pointer"
            bg={current === i ? "blue.500" : "gray.300"}
            onClick={() => setCurrent(i)}
            transition="0.3s"
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default EduHeroCarousel;
