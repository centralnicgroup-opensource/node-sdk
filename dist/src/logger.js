var Logger = (function () {
    function Logger() {
    }
    Logger.prototype.log = function (post, r, error) {
        if (error === void 0) { error = null; }
        console.dir(r.getCommand());
        console.log(post);
        if (error) {
            console.error("HTTP communication failed: ".concat(error));
        }
        console.log(r.getPlain());
        return this;
    };
    return Logger;
}());
export { Logger };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLQTtJQUFBO0lBaUJBLENBQUM7SUFUUSxvQkFBRyxHQUFWLFVBQVcsSUFBWSxFQUFFLENBQVcsRUFBRSxLQUEyQjtRQUEzQixzQkFBQSxFQUFBLFlBQTJCO1FBQy9ELE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQixJQUFJLEtBQUssRUFBRTtZQUNULE9BQU8sQ0FBQyxLQUFLLENBQUMscUNBQThCLEtBQUssQ0FBRSxDQUFDLENBQUM7U0FDdEQ7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQzFCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNILGFBQUM7QUFBRCxDQUFDLEFBakJELElBaUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVzcG9uc2UgfSBmcm9tIFwiLi9yZXNwb25zZS5qc1wiO1xuXG4vKipcbiAqIExvZ2dlciBjbGFzc1xuICovXG5leHBvcnQgY2xhc3MgTG9nZ2VyIHtcbiAgLyoqXG4gICAqIG91dHB1dC9sb2cgZ2l2ZW4gZGF0YVxuICAgKiBAcGFyYW0gcG9zdCByZXF1ZXN0IHN0cmluZyB1c2VkXG4gICAqIEBwYXJhbSByIFJlc3BvbnNlIG9iamVjdFxuICAgKiBAcGFyYW0gZXJyb3IgZXJyb3IgbWVzc2FnZSBvciBudWxsXG4gICAqIEByZXR1cm4gY3VycmVudCBMb2dnZXIgaW5zdGFuY2UgZm9yIG1ldGhvZCBjaGFpbmluZ1xuICAgKi9cbiAgcHVibGljIGxvZyhwb3N0OiBzdHJpbmcsIHI6IFJlc3BvbnNlLCBlcnJvcjogc3RyaW5nIHwgbnVsbCA9IG51bGwpOiBMb2dnZXIge1xuICAgIGNvbnNvbGUuZGlyKHIuZ2V0Q29tbWFuZCgpKTtcbiAgICBjb25zb2xlLmxvZyhwb3N0KTtcbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYEhUVFAgY29tbXVuaWNhdGlvbiBmYWlsZWQ6ICR7ZXJyb3J9YCk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKHIuZ2V0UGxhaW4oKSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cbiJdfQ==