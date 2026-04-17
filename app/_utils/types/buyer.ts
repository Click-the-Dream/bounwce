interface NavItemProps {
  icon: string;
  label: string;
  active?: boolean;
}

interface ProfileData {
  name: string;
  handle: string;
  bio: string;
  followers: number;
  badges: number;
  tags: string[];
}

export interface Message {
  id: number;
  text: string;
  image?: string;
  timestamp: string;
  isSender: boolean;
}
