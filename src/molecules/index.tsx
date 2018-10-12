import Snabbdom from "snabbdom-pragma";
import * as atoms from "../atoms/index";

export const RemoteFriend = ({ user: { name, email } }: any) => (
  <div className="p-3">
    <atoms.Header4 title="Remote Friend" />
    <ul>
      <li>{name}</li>
      <li>{email}</li>
    </ul>
  </div>
);
