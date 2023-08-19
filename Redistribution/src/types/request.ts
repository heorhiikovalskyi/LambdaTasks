export type Request = {
  name: string;
  password: string;
  secret: string;
  shop: number;
};

export const isRequest = (obj: any): obj is Request => {
  return (
    typeof obj.secret === "string" &&
    typeof obj.name === "string" &&
    typeof obj.password === "string" &&
    typeof obj.shop === "number"
  );
};
