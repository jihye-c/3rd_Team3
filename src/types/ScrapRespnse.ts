export default interface ScrapItem {
  0: DetailData;
  title: string;
  content: string;
  image_src: string;
  post_url: string;
  created_at?: string;
  id?: string;
  type?: string;
  user_id?: string;
}

interface DetailData {
  author_img?: string;
  author_name?: string;
  default_data?: string;
  id?: string;
  dong?: string;
  tags?: string[];
}
