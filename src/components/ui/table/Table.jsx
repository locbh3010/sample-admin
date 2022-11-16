import React from "react";
import Pencil from "../../icon/Pencil";
import Trash from "../../icon/Trash";

export function Table({ children }) {
  return <table className="min-w-full">{children}</table>;
}

export function Th({ children }) {
  return (
    <th
      scope="col"
      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
    >
      {children}
    </th>
  );
}

export function Td({ children }) {
  return (
    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
      {children}
    </td>
  );
}

export function UserItem({ data, index }) {
  return (
    <tr className="border-b">
      <Td>{index}</Td>
      <Td>{data.uid}</Td>
      <Td>{data.email}</Td>
      <Td>{data.username}</Td>
      <Td>
        <div className="flex items-center gap-2">
          <button className="bg-red-500 block rounded py-2 px-2 flex-center text-white font-bold">
            <Trash width="20px" />
          </button>
          <button className="bg-blue-500 block rounded py-2 px-2 flex-center text-white font-bold">
            <Pencil width="20px" />
          </button>
        </div>
      </Td>
    </tr>
  );
}
