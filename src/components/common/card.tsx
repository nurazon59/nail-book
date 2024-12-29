import { Card as SCard, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import type { NailSet } from "@prisma/client";

export const Card= ({ title, image, createdAt }:
  NailSet
) => {
  return (
    <SCard className="max-w-sm border">
      <CardHeader>
        <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-lg" />
      </CardHeader>
      <CardContent>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <CardDescription className="text-sm text-gray-500">
          {new Date(createdAt).toLocaleDateString()}
        </CardDescription>
      </CardContent>
    </SCard>
  );
};
