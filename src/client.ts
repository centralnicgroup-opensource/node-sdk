import * as events from "events";
import * as clRequest from "./request";
import * as clResponse from "./response";

/**
 * @alias node.ispapi-apiconnector.Client
 * @desc Used to return 1API API Backend connections
 * @augments events.EventEmitter
 * @constructor
 */
export class Client extends events.EventEmitter {
  /**
   * method to be used for api requests AFTER login procedure
   * @param {Object} p_cmd        API command to request
   * @param {Object} p_cfg        the socket config
   * @param {Function} [p_cb]     the callback method (success case)
   * @param {Function} [p_cberr]  the callback method (error case)
   * @param {String} [p_type]     the response type format: hash or list
   */
  request(p_cmd: any, p_cfg: any, p_cb: Function, p_cberr: Function, p_type: string = 'hash') {
    if (!/^(hash|list)$/.test(p_type)){
      p_type = 'hash';
    }
    if (!p_cfg) {
      const r = new clResponse.Response(clResponse.responses.expired, p_cmd);
      p_cb((r as any)[`as_${p_type}`]());
      return;
    }
    //----- the socket configuration ----
    //keys that may change in cfg:
    //agent -> false to disable socket pooling (no parallel request limitation!),
    //port -> the socket port
    //protocol -> the socket protocol
    //headers -> custom headers to use
    var opts = p_cfg.options || getDefaultOptions();

    if (!opts.headers){
      opts.headers = {};
    }

    //----- the socket parameters ----
    //object keys -> login, pw, entity, remoteaddr, user (aka. subuser)
    //login -> the user account id to use for login
    //pw -> the corresponding user account password
    //entity -> system entity ("1234" for OT&E system, "54cd" for LIVE system)
    //remoteaddr -> the remote ip address of the customer incl. port (1.2.3.4:80)

    var c = this.createConnection(p_cmd, {
      options: opts,
      params: p_cfg.params
    });
    if (p_cb) {
      c.on("response", (r:clResponse.Response) => {
        p_cb((r as any)[`as_${p_type}`]());
      });
    }
    if (p_cberr) {
      c.on("error", (r:clResponse.Response) => {
        p_cberr((r as any)[`as_${p_type}`]());
      });
    }
    else {
      c.on("error", function( /*r*/ ) {
        //console.error('ispapi-apiconnector: error event thrown in request method but no error callback method provided.');
        //console.error(JSON.stringify(r[`as_${p_type}`]()));
      });
    }
    c.request();
  };

  /**
   * method for api login / session start
   * @param {Object} p_params specifying the socket parameters
   * @param {Function} p_cb callback method
   * @param {String} [p_uri] specifying the socket uri to use
   * @param {Object} [p_cmdparams] specifying additional startsession command paramaeters
   */
    login(p_params: any, p_cb: Function, p_uri: string = "https://coreapi.1api.net/api/call.cgi", p_cmdparams: any) {
      if (!/^(http|https):\/\//.test(p_uri))
        throw new Error("Unsupported protocol within api connection uri.");
      let cfg = {
        params: p_params,
        options: getDefaultOptions(p_uri)
      };
      const cb = (r: any) => {
        if (r.CODE === "200") {
          delete cfg.params.pw;
          delete cfg.params.login;
          delete cfg.params.user;
          cfg.params.session = r.PROPERTY.SESSION[0];
        }
        //return the socket configuration for reuse
        p_cb(r, cfg);
      };
      this.request(Object.assign({
        command: "StartSession"
      }, p_cmdparams || {}), cfg, cb, cb);
  };

  /**
   * method for api logout / ending session
   * @param {Object} p_cfg the socket config
   * @param {Function} p_cb callback method
   */
  logout(p_cfg: any, p_cb: Function) {
    this.request({
      command: "EndSession"
    }, p_cfg, p_cb, p_cb);
  };

  /**
   * perform a command request to the 1API backend API
   * @param {Object} p_cmd Object specifying the command to request
   * @param {Object} p_cfg the socket config
   */
  createConnection(p_cmd: any, p_cfg: any) {
    let data = "";
    Object.keys(p_cfg.params).forEach((key) => {
      data += encodeURIComponent('s_' + key);
      data += "=" + encodeURIComponent(p_cfg.params[key]) + "&";
    });
    data += encodeURIComponent("s_command");
    data += "=" + encodeURIComponent(command_encode(p_cmd));
    return new clRequest.Request(p_cfg.options, data, p_cmd);
  };
};

/**
 * convert given command object to string
 * @param {Object} p_cmd Object specifying the command to encode
 */
export const command_encode = (p_cmd: any): string => {
  let nullValueFound: boolean;
  let tmp: string = "";
  if (!(typeof p_cmd === 'string' || p_cmd instanceof String)) {
    nullValueFound = false;
    Object.keys(p_cmd).forEach((key: string) => {
      if (p_cmd[key]!==null||p_cmd[key]!==undefined) { // 'toString' won't work
        tmp += key + '=' + p_cmd[key].toString().replace(/\r|\n/g, "") + "\n";
      }
      else {
        nullValueFound = true;
      }
    });
    if (nullValueFound) {
      console.error('Command with null value in parameter.');
      console.error(p_cmd);
    }
  }
  return tmp;
};

export const getDefaultOptions = (p_uri: string = 'https://coreapi.1api.net/api/call.cgi'): any => {
  const tmp = require("url").parse(p_uri);
  return {
    method: 'POST',
    //, agent: false //default usage of http.globalAgent
    port: (tmp.port || (/^https/i.test(tmp.protocol) ? '443' : '80')),
    protocol: tmp.protocol,
    host: tmp.host.replace(/\:.+$/, ''), //remove port
    path: tmp.path
  };
};