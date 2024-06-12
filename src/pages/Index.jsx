import React, { useRef, useEffect, useState } from "react";
import { Box, Button, VStack, HStack } from "@chakra-ui/react";
import { FaSquare } from "react-icons/fa";

const colors = ["#FF0000", "#FFFF00", "#0000FF", "#FFFFFF", "#000000"];

const Index = () => {
  const canvasRef = useRef(null);
  const [currentColor, setCurrentColor] = useState("#000000");

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const draw = (e) => {
      context.lineWidth = 5;
      context.lineCap = "round";
      context.strokeStyle = currentColor;

      context.lineTo(e.clientX, e.clientY);
      context.stroke();
      context.beginPath();
      context.moveTo(e.clientX, e.clientY);
    };

    const startDrawing = () => {
      canvas.addEventListener("mousemove", draw);
    };

    const stopDrawing = () => {
      canvas.removeEventListener("mousemove", draw);
      context.beginPath();
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseout", stopDrawing);
    };
  }, [currentColor]);

  return (
    <Box position="relative" width="100vw" height="100vh">
      <canvas ref={canvasRef} style={{ display: "block" }} />
      <VStack position="absolute" top={4} left={4} spacing={2}>
        {colors.map((color) => (
          <Button
            key={color}
            leftIcon={<FaSquare color={color} />}
            onClick={() => setCurrentColor(color)}
            colorScheme="gray"
            variant="solid"
          >
            {color}
          </Button>
        ))}
      </VStack>
    </Box>
  );
};

export default Index;