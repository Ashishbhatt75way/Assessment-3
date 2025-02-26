import { Skeleton } from "@mui/material";

const TableSkeleton = () => {
  return (
    <div className="flex gap-2 overflow-x-auto mt-28 ">
      <Skeleton
        animation="wave"
        variant="rectangular"
        sx={{
          width: 1120,
          height: 373,
          bgcolor: "grey.900",
          borderRadius: 2,
        }}
      />
    </div>
  );
};

export default TableSkeleton;
