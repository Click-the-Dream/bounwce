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
