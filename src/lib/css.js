import uid from "uid";
import htmlTags from "html-tags";

const classCache = new Map();
const ruleCache = new Set();
const styleEl = document.createElement("style");
document.body.append(styleEl);

const compileCSS = (segments, ...fns) => (props) => {
  const computed = [segments[0]];
  for (let i = 0; i < fns.length; i++) {
    computed.push(fns[i](props));
    computed.push(segments[i + 1]);
  }
  return computed.join("");
};

const styled = (component) => (...args) => {
  const declarations = compileCSS(...args);
  const rules = [];

  const StyleWrapper = () =>
    function* (props, children) {
      const computedDeclarations = declarations(props);

      let className;
      if (!classCache.has(computedDeclarations)) {
        className = "s-" + uid();
        yield () => {
          styleEl.sheet.insertRule(
            "." + className + " { " + computedDeclarations + " } "
          );
        };
        classCache.set(computedDeclarations, className);
      } else {
        className = classCache.get(computedDeclarations);
      }

      for (let rule of rules) {
        const computedRule = "." + className + rule(props);
        if (!ruleCache.has(computedRule)) {
          yield () => {
            styleEl.sheet.insertRule(computedRule);
          };
          ruleCache.add(computedRule);
        }
      }

      return [
        [
          component,
          {
            ...props,
            className:
              className + (props.className ? " " + props.className : ""),
          },
          children,
        ],
      ];
    };

  StyleWrapper.and = function attachRules(...args) {
    rules.push(compileCSS(...args));
    return this;
  };

  return StyleWrapper;
};

htmlTags.forEach((tag) => (styled[tag] = styled(tag)));

export default styled;
