export const images: string[] = [
  "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1551031749-9257c3aee0df",
  "https://images.unsplash.com/photo-1585085952480-811ff8859fa1?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max",
  "https://images.unsplash.com/profile-1585085716972-0a5b8bb3d3acimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32",
  "https://images.unsplash.com/photo-1579004043177-b341306c3616?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max",
];

const imageByIndex = (index: number): string => images[index % images.length];

export default imageByIndex;
