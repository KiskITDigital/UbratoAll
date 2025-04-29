import { FC, Fragment } from "react";
import style from "./OneTenderOffers.module.css";
import { Category } from "@/components/OneTenderComponentsWrappedVIew/OneTenderInfoViewExecutor/OneTenderInfoViewExecutor";

type TenderOffers = {
  categories: Category[];
};

export const OneTenderOffers: FC<TenderOffers> = ({ categories }) => {
  return (
    <div className={style.block_main}>
      <p className="min-w-[240px]">Услуги:</p>
      <div className="flex gap-2 w-full">
        <div className="flex flex-col gap-3">
          {categories.map((category, categoryIndex) => (
            <div
              className="flex gap-3 items-center"
              key={"category-" + categoryIndex}
            >
              <div className="flex gap-3 items-center text-[18px]">
                {/* <div className="flex items-center justify-center size-10 min-w-10 rounded-[10px] bg-accent/20">
                  <img
                    className="min-w-6 size-6"
                    src="/tenderpics/cleaning_bucket.svg"
                    alt=""
                  />
                </div> */}
                <p>{category.name}</p>
                {">"}
              </div>
              <div className="flex flex-wrap w-full">
                {category.services.map((service, serviceIndex) => (
                  <Fragment key={"service-" + categoryIndex}>
                    <p className="bg-slate-100 rounded-md px-3 py-1">
                      {service}
                    </p>
                    <span className="last:hidden pr-1">,</span>
                  </Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
