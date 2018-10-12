import Snabbdom from "snabbdom-pragma";
import xs, { Stream } from "xstream";
import { run } from "@cycle/run";
import * as atoms from "./atoms/index";
import * as mols from "./molecules/index";
import { store, store$ } from "./store";
import { makeDOMDriver } from "@cycle/dom";

const userFetchById$ = (id = 1) =>
  xs.create<{ fetching: boolean; data?: { name: string } }>({
    start: listener => {
      listener.next({ fetching: true, data: undefined });
      fetch("https://jsonplaceholder.typicode.com/users/" + id)
        .then(res => res.json())
        .then(data => listener.next({ fetching: false, data }));
    },
    stop: () => {}
  });

function main(sources: any) {
  const changeValue$: Stream<string> = sources.DOM.select("input")
    .events("input")
    .map(({ target }: { target: HTMLInputElement }) => target.value)
    .map((val: string) => store.set({ title: val }).title)
    .startWith(store.state.title);

  const vdom$ = xs
    .combine(changeValue$, userFetchById$(2), store$)
    .map(([value, { data: user, fetching }, { size }]) => (
      <div className="w-full border p-2 border-grey-light">
        <atoms.Header1 title="App 1" />
        <h3>App name: {value}</h3>
        <h3>Coolness: {size}</h3>
        {user && !fetching ? <mols.RemoteFriend user={user} /> : "Loading"}
        <atoms.Input value={value} />
      </div>
    ));

  return {
    DOM: vdom$
  };
}

function main2(sources: any) {
  const state$: Stream<number> = sources.DOM.select("input")
    .events("input")
    .map(
      ({ target }: { target: HTMLInputElement }) =>
        store.set({ size: parseInt(target.value) }).size
    )
    .startWith(store.state.size);

  const vdom$ = xs
    .combine(state$, userFetchById$(3), store$)
    .map(([value, { data: user, fetching }, { title }]) => (
      <div className="w-full border p-2 border-blue">
        <atoms.Header1 title="App 2" />
        <h3>App name: {title}</h3>
        <h3>Coolness: {value}</h3>
        {user && !fetching ? <mols.RemoteFriend user={user} /> : "Loading"}
        <atoms.Input type="range" min={0} max={100} value={value} />
      </div>
    ));

  return {
    DOM: vdom$
  };
}

run(main, {
  DOM: makeDOMDriver("#app") as any
});

run(main2, {
  DOM: makeDOMDriver("#app2") as any
});
