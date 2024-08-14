"use client";
import { Tr, Td, Button, Box, Text, useColorModeValue } from "@chakra-ui/react";
import OrderTypePretty from "../order-type-preatty/OrderTypePreatty";
import StatusPretty from "../status-preatty/StatusPreatty";
import RatingPretty from "../rating-preatty/RatingPreatty";
import { useState } from "react";
import Modal from "../../modals/Modal";
import OrderRateModalComponent from "../order-modal-component/OrderRateModalComponent";
import OrderDescriptionModalComponent from "../order-modal-component/OrderDescriptionModalComponent";

export default function OrderRowMobile({ order, accessToken }: any) {
  const [isRateModalOpened, setRateModalOpen] = useState(false);
  const [isDescriptionModalOpened, setDescriptionModalOpen] = useState(false);
  const [orderRating, setOrderRating] = useState(order.rating);

  const handleRateCloseModal = () => {
    setRateModalOpen(false);
  };

  const handleDescriptionCloseModal = () => {
    setDescriptionModalOpen(false);
  };

  // Dynamic background based on light/dark mode
  const bgGradient = useColorModeValue(
    "linear(to-r, white.200, white.400)",
    "linear(to-r, white.500, white.700)"
  );
  const boxShadowColor = useColorModeValue("yellow.400", "yellow.800");

  return (
    <>
      <Box
        className="p-4 mb-4 rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
        bgGradient={bgGradient}
        boxShadow={`0 4px 15px ${boxShadowColor}`}
      >
        <Box className="flex justify-between items-center">
          <Text
            className="font-semibold text-xl"
            color={useColorModeValue("gray.900", "white")}
          >
            <OrderTypePretty orderType={order.eventType} />
          </Text>
          <Text color={useColorModeValue("gray.600", "gray.400")}>
            {formatDate(order.createdAt)}
          </Text>
        </Box>

        <Box className="mt-4">
          <StatusPretty statusType={order.status} />
        </Box>

        <Text className="mt-4 text-md" color={useColorModeValue("gray.800", "gray.300")}>
          {JSON.stringify(order.additionalOptions.orderDetails)}
        </Text>

        <Box className="mt-4">
          {orderRating ? (
            <RatingPretty rating={orderRating} />
          ) : (
            <Button
              colorScheme="yellow"
              size="sm"
              variant="outline"
              onClick={() => setRateModalOpen(true)}
            >
              Rate
            </Button>
          )}
        </Box>
      </Box>

      {isRateModalOpened && (
        <Modal isOpen={isRateModalOpened} onClose={handleRateCloseModal}>
          <OrderRateModalComponent
            setRating={setOrderRating}
            accessToken={accessToken}
            coffeeOrderId={order.orderId}
            onClose={handleRateCloseModal}
          />
        </Modal>
      )}

      {isDescriptionModalOpened && (
        <Modal
          isOpen={isDescriptionModalOpened}
          onClose={handleDescriptionCloseModal}
        >
          <OrderDescriptionModalComponent
            description={objectToString(order.additionalOptions)}
            onClose={handleDescriptionCloseModal}
          />
        </Modal>
      )}
    </>
  );
}

function objectToString(obj: any): string {
  if (typeof obj !== "object" || obj === null) {
    return String(obj);
  }

  return Object.entries(obj)
    .map(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        return `${key}:\n${objectToString(value)
          .split("\n")
          .map((line) => `  ${line}`)
          .join("\n")}`;
      }
      return `${key}: ${value}`;
    })
    .join("\n");
}

// utils/dateUtils.js
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  const diff = now.getTime() - date.getTime();
  const oneDay = 1000 * 60 * 60 * 24;

  if (diff < oneDay) return "Today";
  if (diff < 2 * oneDay) return "Yesterday";
  if (diff < 7 * oneDay) return "A few days ago";
  if (diff < 14 * oneDay) return "Last week";
  if (diff < 30 * oneDay) return "Last month";
  if (diff < 365 * oneDay) return "More than a month ago";
  return "More than a year ago";
}
