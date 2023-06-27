import _ from "lodash";

/**
 *
 * Sorting rule heirarchy:
 * Replace ' - ' with ' '
 * Case-insensitive
 * '#', '(', ')', '*' makes no difference in sort order
 * Split string into chunks by " "
 * Strings with number in chunk 1 -- sorted ASC by number
 * Strings with number in chunk 2 -- sorted ASC alphabetically by chunk 1, then ASC by number by chunk 2
 * Strings with digits in any place will beat string with no digits
 * If first chunk contains uniform label like "Store" or "Site", it is ignored
 * All strings without digits, sorted ASC alphabetically
 *
 */

const isLegitNumber = str => !Number.isNaN(parseInt(str));

function advancedStoreSort(a, b) {
  a = (a + "")
    .trim()
    .replace(/\s*-\s*/gm, " ")
    .replace(/#/gm, "")
    .replace(/\*/gm, "")
    .replace(/\(/gm, "")
    .replace(/\)/gm, "")
    .toLowerCase();
  b = (b + "")
    .trim()
    .replace(/\s*-\s*/gm, " ")
    .replace(/#/gm, "")
    .replace(/\*/gm, "")
    .replace(/\(/gm, "")
    .replace(/\)/gm, "")
    .toLowerCase();

  if (a.startsWith("site") && b.startsWith("site")) {
    a = a.slice(4, a.length).trim();
    b = b.slice(4, b.length).trim();
  }

  if (a.startsWith("store") && b.startsWith("store")) {
    a = a.slice(5, a.length).trim();
    b = b.slice(5, b.length).trim();
  }

  const _a = a.split(" ");
  const _b = b.split(" ");

  const headA = _.head(_a);
  const headB = _.head(_b);
  const lastA = _.last(_a);
  const lastB = _.last(_b);

  if (_a.length === 1 && _b.length === 1) {
    if (isLegitNumber(headA) && isLegitNumber(headB)) {
      if (parseInt(headA) > parseInt(headB)) {
        return 1;
      }

      if (parseInt(headA) < parseInt(headB)) {
        return -1;
      }

      if (parseInt(headA) === parseInt(headB)) {
        return 0;
      }
    }

    if (isLegitNumber(headA) && !isLegitNumber(headB)) {
      return -1;
    }

    if (!isLegitNumber(headA) && isLegitNumber(headB)) {
      return 1;
    }

    if (!isLegitNumber(headA) && !isLegitNumber(headB)) {
      if (headA > headB) {
        return 1;
      }

      if (headA < headB) {
        return -1;
      }

      if (headA === headB) {
        return 0;
      }
    }
  }

  if (_a.length > 1 || _b.length > 1) {
    if (isLegitNumber(headA) && isLegitNumber(headB)) {
      if (parseInt(headA) > parseInt(headB)) {
        return 1;
      }

      if (parseInt(headA) < parseInt(headB)) {
        return -1;
      }

      if (parseInt(headA) === parseInt(headB)) {
        return 0;
      }
    }

    if (isLegitNumber(headA) && !isLegitNumber(headB)) {
      return -1;
    }

    if (!isLegitNumber(headA) && isLegitNumber(headB)) {
      return 1;
    }

    if (!isLegitNumber(headA) && !isLegitNumber(headB) && isLegitNumber(lastA) && isLegitNumber(lastB)) {
      if (headA > headB) {
        return 1;
      }

      if (headA < headB) {
        return -1;
      }

      if (headA === headB) {
        if (parseInt(lastA) > parseInt(lastB)) {
          return 1;
        }

        if (parseInt(lastA) < parseInt(lastB)) {
          return -1;
        }

        if (lastA === lastB) {
          return 0;
        }
      }
    }

    if (_a.length === 1 && !isLegitNumber(headA) && (isLegitNumber(headB) || isLegitNumber(lastB))) {
      return 1;
    }

    if (_b.length === 1 && !isLegitNumber(headB) && (isLegitNumber(headA) || isLegitNumber(lastA))) {
      return -1;
    }

    if (_a.length === 1 && !isLegitNumber(headA) && !isLegitNumber(headB) && !isLegitNumber(lastB)) {
      if (!/\d/gm.test(a) && /\d/gm.test(b)) {
        return 1;
      }

      if (headA > headB) {
        return 1;
      }

      if (headA < headB) {
        return -1;
      }

      if (headA === headB) {
        return 1;
      }
    }

    if (_b.length === 1 && !isLegitNumber(headB) && !isLegitNumber(headA) && !isLegitNumber(lastA)) {
      if (/\d/gm.test(a) && !/\d/gm.test(b)) {
        return -1;
      }

      if (headA > headB) {
        return 1;
      }

      if (headA < headB) {
        return -1;
      }

      if (headA === headB) {
        return 1;
      }
    }
  }

  if (/\d/gm.test(a) && !/\d/gm.test(b)) {
    return -1;
  }

  if (!/\d/gm.test(a) && /\d/gm.test(b)) {
    return 1;
  }

  if (a > b) {
    return 1;
  }

  if (a < b) {
    return -1;
  }

  if (a === b) {
    return 0;
  }
}

export default advancedStoreSort;
