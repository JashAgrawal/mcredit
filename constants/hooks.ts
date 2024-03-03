import { createAvatar } from "@dicebear/core";
import { avataaars } from "@dicebear/collection";

export const genAvatar = () => {
  return createAvatar(avataaars, {
    backgroundColor: ["b6e3f4", "c0aede", "d1d4f9", "ffd5dc", "ffdfbf"],
    randomizeIds: true,
    style: ["circle"],
    seed: Math.random().toString(),
  }).toString();
};
