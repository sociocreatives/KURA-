import { ReactChild, ReactChildren } from 'react';

interface PropsType {
  children: ReactChild | ReactChildren;
  whichPage: string;
}

export default function Content({ children, whichPage }: PropsType) {
  return (
    <div className="col-lg-10 py-4">
      <div className="row mb-5">
        <div className="col pb-3">
          <h2 className="text-black-custom .title-head">{whichPage}</h2>
        </div>
      </div>
      <div className="row col-md-12 col-lg-12 col-xs-12">{children}</div>
    </div>
  );
}
