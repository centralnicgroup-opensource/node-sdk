"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
                    plain += "\r\nPROPERTY[" + key + "][" + index + "]=" + val;
                });
            });
        }
        if (Object.prototype.hasOwnProperty.call(r, "CODE")) {
            plain += "\r\nCODE=" + r.CODE;
        }
        if (Object.prototype.hasOwnProperty.call(r, "DESCRIPTION")) {
            plain += "\r\nDESCRIPTION=" + r.DESCRIPTION;
        }
        if (Object.prototype.hasOwnProperty.call(r, "QUEUETIME")) {
            plain += "\r\nQUEUETIME=" + r.QUEUETIME;
        }
        if (Object.prototype.hasOwnProperty.call(r, "RUNTIME")) {
            plain += "\r\nRUNTIME=" + r.RUNTIME;
        }
        plain += "\r\nEOF\r\n";
        return plain;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2VwYXJzZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcmVzcG9uc2VwYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDYSxRQUFBLGNBQWMsR0FBUTtJQU0vQixLQUFLLEVBQUUsVUFBQyxHQUFXO1FBQ2YsSUFBTSxJQUFJLEdBQVEsRUFBRSxDQUFDO1FBQ3JCLElBQU0sTUFBTSxHQUFHLG1DQUFtQyxDQUFDO1FBQ25ELElBQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqRCxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUU7WUFDYixJQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLFNBQUEsQ0FBQztZQUNOLElBQUksR0FBRyxFQUFFO2dCQUNMLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QixJQUFJLENBQUMsRUFBRTtvQkFDSCxJQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7b0JBQ2hELElBQUksRUFBRSxFQUFFO3dCQUNKLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxFQUFFOzRCQUN6RCxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQzt5QkFDdEI7d0JBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO3dCQUMvQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7NEJBQzdELElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO3lCQUM3Qjt3QkFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO3FCQUMxRDt5QkFBTTt3QkFDSCxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7cUJBQzFEO2lCQUNKO2FBQ0o7U0FDSjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFNRCxTQUFTLEVBQUUsVUFBQyxDQUFNO1FBQ2QsSUFBSSxLQUFLLEdBQUcsWUFBWSxDQUFDO1FBQ3pCLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsRUFBRTtZQUNyRCxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFHO2dCQUNoQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQVcsRUFBRSxLQUFhO29CQUMvQyxLQUFLLElBQUksa0JBQWdCLEdBQUcsVUFBSyxLQUFLLFVBQUssR0FBSyxDQUFDO2dCQUNyRCxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1NBQ047UUFDRCxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDakQsS0FBSyxJQUFJLGNBQVksQ0FBQyxDQUFDLElBQU0sQ0FBQztTQUNqQztRQUNELElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxhQUFhLENBQUMsRUFBRTtZQUN4RCxLQUFLLElBQUkscUJBQW1CLENBQUMsQ0FBQyxXQUFhLENBQUM7U0FDL0M7UUFDRCxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLEVBQUU7WUFDdEQsS0FBSyxJQUFJLG1CQUFpQixDQUFDLENBQUMsU0FBVyxDQUFDO1NBQzNDO1FBQ0QsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxFQUFFO1lBQ3BELEtBQUssSUFBSSxpQkFBZSxDQUFDLENBQUMsT0FBUyxDQUFDO1NBQ3ZDO1FBQ0QsS0FBSyxJQUFJLGFBQWEsQ0FBQztRQUN2QixPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0NBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuZXhwb3J0IGNvbnN0IFJlc3BvbnNlUGFyc2VyOiBhbnkgPSB7XG4gICAgLyoqXG4gICAgKiBNZXRob2QgdG8gcGFyc2UgcGxhaW4gQVBJIHJlc3BvbnNlIGludG8ganMgb2JqZWN0XG4gICAgKiBAcGFyYW0gcmF3IEFQSSBwbGFpbiByZXNwb25zZVxuICAgICogQHJldHVybnMgQVBJIHJlc3BvbnNlIGFzIEpTIE9iamVjdCAoaGFzaClcbiAgICAqL1xuICAgIHBhcnNlOiAocmF3OiBzdHJpbmcpOiBhbnkgPT4ge1xuICAgICAgICBjb25zdCBoYXNoOiBhbnkgPSB7fTtcbiAgICAgICAgY29uc3QgcmVnZXhwID0gL14oW149XSpbXlxcdD0gXSlbXFx0IF0qPVtcXHQgXSooLiopJC87XG4gICAgICAgIGNvbnN0IHIgPSByYXcucmVwbGFjZSgvXFxyXFxuL2csIFwiXFxuXCIpLnNwbGl0KFwiXFxuXCIpO1xuICAgICAgICB3aGlsZSAoci5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IHIuc2hpZnQoKTtcbiAgICAgICAgICAgIGxldCBtO1xuICAgICAgICAgICAgaWYgKHJvdykge1xuICAgICAgICAgICAgICAgIG0gPSByb3cubWF0Y2gocmVnZXhwKTtcbiAgICAgICAgICAgICAgICBpZiAobSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtbSA9IG1bMV0ubWF0Y2goL15wcm9wZXJ0eVxcWyhbXlxcXV0qKVxcXS9pKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChoYXNoLCBcIlBST1BFUlRZXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzaC5QUk9QRVJUWSA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbW1bMV0gPSBtbVsxXS50b1VwcGVyQ2FzZSgpLnJlcGxhY2UoL1xccy9nLCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhhc2guUFJPUEVSVFksIG1tWzFdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc2guUFJPUEVSVFlbbW1bMV1dID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBoYXNoLlBST1BFUlRZW21tWzFdXS5wdXNoKG1bMl0ucmVwbGFjZSgvW1xcdCBdKiQvLCBcIlwiKSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYXNoW21bMV0udG9VcHBlckNhc2UoKV0gPSBtWzJdLnJlcGxhY2UoL1tcXHQgXSokLywgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGhhc2g7XG4gICAgfSxcbiAgICAvKipcbiAgICAqIFNlcmlhbGl6ZSBnaXZlbiBwYXJzZWQgcmVzcG9uc2UgaGFzaCBiYWNrIHRvIHBsYWluIHRleHRcbiAgICAqIEBwYXJhbSByIEFQSSByZXNwb25zZSBhcyBKUyBPYmplY3QgKGhhc2gpXG4gICAgKiBAcmV0dXJucyBwbGFpbiBBUEkgcmVzcG9uc2VcbiAgICAqL1xuICAgIHNlcmlhbGl6ZTogKHI6IGFueSk6IHN0cmluZyA9PiB7XG4gICAgICAgIGxldCBwbGFpbiA9IFwiW1JFU1BPTlNFXVwiO1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHIsIFwiUFJPUEVSVFlcIikpIHtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHIuUFJPUEVSVFkpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIHIuUFJPUEVSVFlba2V5XS5mb3JFYWNoKCh2YWw6IHN0cmluZywgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBwbGFpbiArPSBgXFxyXFxuUFJPUEVSVFlbJHtrZXl9XVske2luZGV4fV09JHt2YWx9YDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwociwgXCJDT0RFXCIpKSB7XG4gICAgICAgICAgICBwbGFpbiArPSBgXFxyXFxuQ09ERT0ke3IuQ09ERX1gO1xuICAgICAgICB9XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwociwgXCJERVNDUklQVElPTlwiKSkge1xuICAgICAgICAgICAgcGxhaW4gKz0gYFxcclxcbkRFU0NSSVBUSU9OPSR7ci5ERVNDUklQVElPTn1gO1xuICAgICAgICB9XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwociwgXCJRVUVVRVRJTUVcIikpIHtcbiAgICAgICAgICAgIHBsYWluICs9IGBcXHJcXG5RVUVVRVRJTUU9JHtyLlFVRVVFVElNRX1gO1xuICAgICAgICB9XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwociwgXCJSVU5USU1FXCIpKSB7XG4gICAgICAgICAgICBwbGFpbiArPSBgXFxyXFxuUlVOVElNRT0ke3IuUlVOVElNRX1gO1xuICAgICAgICB9XG4gICAgICAgIHBsYWluICs9IFwiXFxyXFxuRU9GXFxyXFxuXCI7XG4gICAgICAgIHJldHVybiBwbGFpbjtcbiAgICB9XG59O1xuIl19