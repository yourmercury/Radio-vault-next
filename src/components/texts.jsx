export default function Text({ size, children, cls, onClick }) {
  switch (size) {
    case "sm":
      return <SmallText cls={cls} onClick={onClick}>{children}</SmallText>;
    case "lg":
      return <BigText cls={cls} onClick={onClick}>{children}</BigText>;
    case "md":
      return <MidText cls={cls} onClick={onClick}>{children}</MidText>;
    default:
      return <SmallText cls={cls} onClick={onClick}>{children}</SmallText>;
  }
}

function SmallText({ children, cls, onClick }) {
  return <div className={`text-[13px] h-fit ${cls}`} onClick={()=>{
      onClick&&onClick();
  }}>{children}</div>;
}

function BigText({ children, cls, onClick }) {
  return <div className={`text-[20px] h-fit ${cls}`} onClick={()=>{
      onClick&&onClick();
  }}>{children}</div>;
}

function MidText({ children, cls, onClick }) {
  return <div className={`text-[16px] h-fit ${cls}`} onClick={()=>{
      onClick&&onClick();
  }}>{children}</div>;
}
