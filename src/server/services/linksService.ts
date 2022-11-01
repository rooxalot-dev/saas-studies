import prisma from "@libs/prisma";
import { Link } from "@prisma/client";
import { DeleteLinkDTO, LinkByIdDTO, LinksByTenantDTO, SaveLinkDTO } from "src/models/Link"
import { IPageable } from "src/models/Pageable";

export const getLinksPage = async (input: LinksByTenantDTO): Promise<IPageable<Link>> => {
  const { tenantId } = input;
  let { page, size } = input;

  if (!page) {
    page = 1;
  }

  if (!size) {
    size = 5;
  }

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

export const getLinkById = async (input: LinkByIdDTO): Promise<Link | null> => {
  const { linkId } = input;
  
  const link = await prisma.link.findFirst({
    where: {
      id: linkId
    }
  });

  return link;
};

export const saveLink = async (input: SaveLinkDTO) => {
  let link: Link;

  if (input.id) {
    const editedLink = await prisma.link.update({
      data: input,
      where: {
        id: input.id
      }
    })
    link = editedLink;
  } else {
    const createdLink = await prisma.link.create({ data: input });
    link = createdLink
  }

  return link;
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
