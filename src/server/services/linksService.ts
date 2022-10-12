import { Link } from "@prisma/client";
import { DeleteLinkDTO, LinksByTenantDTO, SaveLinkDTO } from "src/models/Link"
import { IPageable } from "src/models/Pageable";

const countLinks = async (tenantId: string) => {
  const count = await prisma.link.count({
    where: {
      tenantId: {
        equals: tenantId,
      }
    },
  });

  return count;
}

const getLinks = async (tenantId: string, page: number, size: number) => {
  const links = await prisma.link.findMany({
    skip: (page - 1) * size,
    take: size,
    where: {
      tenantId: {
        equals: tenantId,
      }
    },
  });

  return links;
}

export const getLinksPage = async (input: LinksByTenantDTO): Promise<IPageable<Link>> => {
  const { tenantId } = input;
  let { page, size } = input;

  if (!page) {
    page = 1;
  }

  if (!size) {
    size = 5;
  }

  const [count, links] = await Promise.all<[
    Promise<number>,
    Promise<Link[]>,
  ]>([
    countLinks(tenantId),
    getLinks(tenantId, page, size)
  ]);

  const pageableLinks: IPageable<Link> = {
    data: links,
    totalRecords: count,
    totalPages: Math.ceil(count / size)
  };

  return pageableLinks;
};

export const saveLink = async (input: SaveLinkDTO) => {
  const createdLink = await prisma.link.create({ data: input });
  return createdLink;
};

export const deleteLink = async (input: DeleteLinkDTO) => {
  const deletedLink = await prisma.link.delete({
    where: {
      id: input.linkId
    }
  });

  return deletedLink;
};

export default {
  getLinksPage,
  saveLink,
  deleteLink,
}
