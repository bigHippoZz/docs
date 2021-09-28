import G6 from "@antv/g6";
import { merge } from "lodash";
import { onMounted } from "@vue/runtime-core";

export function useTreeConf(data, options) {
  console.log(data);
  onMounted(() => {
    const container = document.getElementById("container");
    const width = container!.scrollWidth;
    const height = container!.scrollHeight || 1000;

    options = merge(
      {
        container: "container",
        width,
        height,
        linkCenter: true,

        modes: {
          default: [
            {
              type: "collapse-expand",
              onChange: function onChange(item, collapsed) {
                const data = item!.getModel();
                data.collapsed = collapsed;
                return true;
              },
            },
            "drag-canvas",
            "zoom-canvas",
          ],
        },
        defaultNode: {
          size: 80,
          style: {
            fill: "#A1C45A",
            stroke: "#A1C45A",
          },
        },
        defaultEdge: {
          type: "cubic-vertical",
          color: "#7F7C82",
          style: {
            lineWidth: 5,
          },
        },
        layout: {
          type: "compactBox",
          direction: "TB",
          getId: function getId(d) {
            return d.id;
          },
          getHeight: function getHeight() {
            return 40;
          },
          getWidth: function getWidth() {
            return 40;
          },
          getVGap: function getVGap() {
            return 70;
          },
          getHGap: function getHGap() {
            return 20;
          },
        },
      },
      options
    );

    const graph = new G6.TreeGraph(options);

    graph.node(function (node) {
      return {
        label: node.id,
        style: {
          fill: !node.color ? "#112031" : "red",
          stroke: "#A1C45A",
        },
        labelCfg: {
          position: "center",
          style: {
            fontSize: 40,
            fontFamily: "Monaco",
            fill: "#FFF9E0",
          },
        },
      };
    });

    graph.data(data);
    graph.render();
    graph.fitView();

    if (typeof window !== "undefined") {
      window.onresize = () => {
        if (!graph || graph.get("destroyed")) return;
        if (!container || !container.scrollWidth || !container.scrollHeight)
          return;
        graph.changeSize(container.scrollWidth, container.scrollHeight);
      };
    }
  });
}

class Node {
  val: number;
  prev: Node | null;
  next: Node | null;
  child: Node | null;
  constructor(val?: number, prev?: Node, next?: Node, child?: Node) {
    this.val = val === undefined ? 0 : val;
    this.prev = prev === undefined ? null : prev;
    this.next = next === undefined ? null : next;
    this.child = child === undefined ? null : child;
  }
}

function flatten(head: Node | null): Node | null {
  const result = new Node(-1);
  let current = result;
  function helper(head: Node | null) {
    if (!head) return;
    helper(head.next);
    helper(head.child);
    current.next = current;
    head.child = null;
    current = head;
  }
  helper(head);
  return current;
}
