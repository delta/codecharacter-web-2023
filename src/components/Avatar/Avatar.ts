import avatar0 from '../../assets/avatars/avatar0.png';
import avatar1 from '../../assets/avatars/avatar1.png';
import avatar2 from '../../assets/avatars/avatar2.png';
import avatar3 from '../../assets/avatars/avatar3.png';
import avatar4 from '../../assets/avatars/avatar4.png';
import avatar5 from '../../assets/avatars/avatar5.png';
import avatar6 from '../../assets/avatars/avatar6.png';
import avatar7 from '../../assets/avatars/avatar7.png';
import avatar8 from '../../assets/avatars/avatar8.png';
import avatar9 from '../../assets/avatars/avatar9.png';
import avatar10 from '../../assets/avatars/avatar10.png';
import avatar11 from '../../assets/avatars/avatar11.png';
import avatar12 from '../../assets/avatars/avatar12.png';
import avatar13 from '../../assets/avatars/avatar13.png';
import avatar14 from '../../assets/avatars/avatar14.png';
import avatar15 from '../../assets/avatars/avatar15.png';
import avatar16 from '../../assets/avatars/avatar16.png';
import avatar17 from '../../assets/avatars/avatar17.png';
import avatar18 from '../../assets/avatars/avatar18.png';
import avatar19 from '../../assets/avatars/avatar19.png';

interface AvatarType {
  id: number;
  url: string;
}

const avatars: AvatarType[] = [
  {
    id: 0,
    url: avatar0,
  },
  {
    id: 1,
    url: avatar1,
  },
  {
    id: 2,
    url: avatar2,
  },
  {
    id: 3,
    url: avatar3,
  },
  {
    id: 4,
    url: avatar4,
  },
  {
    id: 5,
    url: avatar5,
  },
  {
    id: 6,
    url: avatar6,
  },
  {
    id: 7,
    url: avatar7,
  },
  {
    id: 8,
    url: avatar8,
  },
  {
    id: 9,
    url: avatar9,
  },
  {
    id: 10,
    url: avatar10,
  },
  {
    id: 11,
    url: avatar11,
  },
  {
    id: 12,
    url: avatar12,
  },
  {
    id: 13,
    url: avatar13,
  },
  {
    id: 14,
    url: avatar14,
  },
  {
    id: 15,
    url: avatar15,
  },
  {
    id: 16,
    url: avatar16,
  },
  {
    id: 17,
    url: avatar17,
  },
  {
    id: 18,
    url: avatar18,
  },
  {
    id: 19,
    url: avatar19,
  },
];

export const getAvatarByID = (id: number): AvatarType => {
  return avatars[id];
};

export const getAllAvatars = (): AvatarType[] => {
  return avatars;
};
