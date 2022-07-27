"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseParser = void 0;
exports.ResponseParser = {
    parse: function (raw) {
        var hash = {};
        var regexp = /^([^=]*[^\t= ])[\t ]*=[\t ]*(.*)$/;
        var r = raw.replace(/\r\n/g, "\n").split("\n");
        while (r.length) {
            var row = r.shift();
            var m = void 0;
            if (row) {
                m = row.match(regexp);
                if (m) {
                    var mm = m[1].match(/^property\[([^\]]*)\]/i);
                    if (mm) {
                        if (!Object.prototype.hasOwnProperty.call(hash, "PROPERTY")) {
                            hash.PROPERTY = {};
                        }
                        mm[1] = mm[1].toUpperCase().replace(/\s/g, "");
                        if (!Object.prototype.hasOwnProperty.call(hash.PROPERTY, mm[1])) {
                            hash.PROPERTY[mm[1]] = [];
                        }
                        hash.PROPERTY[mm[1]].push(m[2].replace(/[\t ]*$/, ""));
                    }
                    else {
                        hash[m[1].toUpperCase()] = m[2].replace(/[\t ]*$/, "");
                    }
                }
            }
        }
        return hash;
    },
    serialize: function (r) {
        var plain = "[RESPONSE]";
        if (Object.prototype.hasOwnProperty.call(r, "PROPERTY")) {
            Object.keys(r.PROPERTY).forEach(function (key) {
                r.PROPERTY[key].forEach(function (val, index) {
                    plain += "\r\nPROPERTY[".concat(key, "][").concat(index, "]=").concat(val);
                });
            });
        }
        if (Object.prototype.hasOwnProperty.call(r, "CODE")) {
            plain += "\r\nCODE=".concat(r.CODE);
        }
        if (Object.prototype.hasOwnProperty.call(r, "DESCRIPTION")) {
            plain += "\r\nDESCRIPTION=".concat(r.DESCRIPTION);
        }
        if (Object.prototype.hasOwnProperty.call(r, "QUEUETIME")) {
            plain += "\r\nQUEUETIME=".concat(r.QUEUETIME);
        }
        if (Object.prototype.hasOwnProperty.call(r, "RUNTIME")) {
            plain += "\r\nRUNTIME=".concat(r.RUNTIME);
        }
        plain += "\r\nEOF\r\n";
        return plain;
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2VwYXJzZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcmVzcG9uc2VwYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQWEsUUFBQSxjQUFjLEdBQVE7SUFNakMsS0FBSyxFQUFFLFVBQUMsR0FBVztRQUNqQixJQUFNLElBQUksR0FBUSxFQUFFLENBQUM7UUFDckIsSUFBTSxNQUFNLEdBQUcsbUNBQW1DLENBQUM7UUFDbkQsSUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pELE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsU0FBQSxDQUFDO1lBQ04sSUFBSSxHQUFHLEVBQUU7Z0JBQ1AsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxFQUFFO29CQUNMLElBQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQztvQkFDaEQsSUFBSSxFQUFFLEVBQUU7d0JBQ04sSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLEVBQUU7NEJBQzNELElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO3lCQUNwQjt3QkFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7d0JBQy9DLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTs0QkFDL0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7eUJBQzNCO3dCQUNELElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7cUJBQ3hEO3lCQUFNO3dCQUNMLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztxQkFDeEQ7aUJBQ0Y7YUFDRjtTQUNGO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBTUQsU0FBUyxFQUFFLFVBQUMsQ0FBTTtRQUNoQixJQUFJLEtBQUssR0FBRyxZQUFZLENBQUM7UUFDekIsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxFQUFFO1lBQ3ZELE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQUc7Z0JBQ2xDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBVyxFQUFFLEtBQWE7b0JBQ2pELEtBQUssSUFBSSx1QkFBZ0IsR0FBRyxlQUFLLEtBQUssZUFBSyxHQUFHLENBQUUsQ0FBQztnQkFDbkQsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztTQUNKO1FBQ0QsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25ELEtBQUssSUFBSSxtQkFBWSxDQUFDLENBQUMsSUFBSSxDQUFFLENBQUM7U0FDL0I7UUFDRCxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsYUFBYSxDQUFDLEVBQUU7WUFDMUQsS0FBSyxJQUFJLDBCQUFtQixDQUFDLENBQUMsV0FBVyxDQUFFLENBQUM7U0FDN0M7UUFDRCxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLEVBQUU7WUFDeEQsS0FBSyxJQUFJLHdCQUFpQixDQUFDLENBQUMsU0FBUyxDQUFFLENBQUM7U0FDekM7UUFDRCxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLEVBQUU7WUFDdEQsS0FBSyxJQUFJLHNCQUFlLENBQUMsQ0FBQyxPQUFPLENBQUUsQ0FBQztTQUNyQztRQUNELEtBQUssSUFBSSxhQUFhLENBQUM7UUFDdkIsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBSZXNwb25zZVBhcnNlcjogYW55ID0ge1xuICAvKipcbiAgICogTWV0aG9kIHRvIHBhcnNlIHBsYWluIEFQSSByZXNwb25zZSBpbnRvIGpzIG9iamVjdFxuICAgKiBAcGFyYW0gcmF3IEFQSSBwbGFpbiByZXNwb25zZVxuICAgKiBAcmV0dXJucyBBUEkgcmVzcG9uc2UgYXMgSlMgT2JqZWN0IChoYXNoKVxuICAgKi9cbiAgcGFyc2U6IChyYXc6IHN0cmluZyk6IGFueSA9PiB7XG4gICAgY29uc3QgaGFzaDogYW55ID0ge307XG4gICAgY29uc3QgcmVnZXhwID0gL14oW149XSpbXlxcdD0gXSlbXFx0IF0qPVtcXHQgXSooLiopJC87XG4gICAgY29uc3QgciA9IHJhdy5yZXBsYWNlKC9cXHJcXG4vZywgXCJcXG5cIikuc3BsaXQoXCJcXG5cIik7XG4gICAgd2hpbGUgKHIubGVuZ3RoKSB7XG4gICAgICBjb25zdCByb3cgPSByLnNoaWZ0KCk7XG4gICAgICBsZXQgbTtcbiAgICAgIGlmIChyb3cpIHtcbiAgICAgICAgbSA9IHJvdy5tYXRjaChyZWdleHApO1xuICAgICAgICBpZiAobSkge1xuICAgICAgICAgIGNvbnN0IG1tID0gbVsxXS5tYXRjaCgvXnByb3BlcnR5XFxbKFteXFxdXSopXFxdL2kpO1xuICAgICAgICAgIGlmIChtbSkge1xuICAgICAgICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaGFzaCwgXCJQUk9QRVJUWVwiKSkge1xuICAgICAgICAgICAgICBoYXNoLlBST1BFUlRZID0ge307XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtbVsxXSA9IG1tWzFdLnRvVXBwZXJDYXNlKCkucmVwbGFjZSgvXFxzL2csIFwiXCIpO1xuICAgICAgICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaGFzaC5QUk9QRVJUWSwgbW1bMV0pKSB7XG4gICAgICAgICAgICAgIGhhc2guUFJPUEVSVFlbbW1bMV1dID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBoYXNoLlBST1BFUlRZW21tWzFdXS5wdXNoKG1bMl0ucmVwbGFjZSgvW1xcdCBdKiQvLCBcIlwiKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGhhc2hbbVsxXS50b1VwcGVyQ2FzZSgpXSA9IG1bMl0ucmVwbGFjZSgvW1xcdCBdKiQvLCBcIlwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGhhc2g7XG4gIH0sXG4gIC8qKlxuICAgKiBTZXJpYWxpemUgZ2l2ZW4gcGFyc2VkIHJlc3BvbnNlIGhhc2ggYmFjayB0byBwbGFpbiB0ZXh0XG4gICAqIEBwYXJhbSByIEFQSSByZXNwb25zZSBhcyBKUyBPYmplY3QgKGhhc2gpXG4gICAqIEByZXR1cm5zIHBsYWluIEFQSSByZXNwb25zZVxuICAgKi9cbiAgc2VyaWFsaXplOiAocjogYW55KTogc3RyaW5nID0+IHtcbiAgICBsZXQgcGxhaW4gPSBcIltSRVNQT05TRV1cIjtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHIsIFwiUFJPUEVSVFlcIikpIHtcbiAgICAgIE9iamVjdC5rZXlzKHIuUFJPUEVSVFkpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICByLlBST1BFUlRZW2tleV0uZm9yRWFjaCgodmFsOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICBwbGFpbiArPSBgXFxyXFxuUFJPUEVSVFlbJHtrZXl9XVske2luZGV4fV09JHt2YWx9YDtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChyLCBcIkNPREVcIikpIHtcbiAgICAgIHBsYWluICs9IGBcXHJcXG5DT0RFPSR7ci5DT0RFfWA7XG4gICAgfVxuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwociwgXCJERVNDUklQVElPTlwiKSkge1xuICAgICAgcGxhaW4gKz0gYFxcclxcbkRFU0NSSVBUSU9OPSR7ci5ERVNDUklQVElPTn1gO1xuICAgIH1cbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHIsIFwiUVVFVUVUSU1FXCIpKSB7XG4gICAgICBwbGFpbiArPSBgXFxyXFxuUVVFVUVUSU1FPSR7ci5RVUVVRVRJTUV9YDtcbiAgICB9XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChyLCBcIlJVTlRJTUVcIikpIHtcbiAgICAgIHBsYWluICs9IGBcXHJcXG5SVU5USU1FPSR7ci5SVU5USU1FfWA7XG4gICAgfVxuICAgIHBsYWluICs9IFwiXFxyXFxuRU9GXFxyXFxuXCI7XG4gICAgcmV0dXJuIHBsYWluO1xuICB9LFxufTtcbiJdfQ==