import data from "../config/data.json";
import Tranding from "./Tranding";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import "swiper/css/scrollbar";
export default function Home({ search }: any) {
  const items = data;

  if (search.length == 0) {
    return (
      <>
        <Swiper
          className="mySwiper tranding-container"
          scrollbar={{
            hide: true,
          }}
          modules={[Scrollbar]}
        >
          {items.map((item) => (
            <SwiperSlide>
              <Tranding {...item} key={item.title} search={search} />
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    );
  }
}
