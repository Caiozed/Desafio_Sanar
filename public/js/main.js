var app = new Vue({
  el: "#app",
  data: {
    plans: [],
    selectedPlan: {},
    subscriptions: [],
    selectedSubscription: {},
    customers: [],
    selectedCustomer: {},
    response: ""
  },
  created() {
    axios
      .get("/get?path=plans")
      .then(response => {
        // handle success
        this.plans = JSON.parse(response.data).data;
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });

    axios
      .get("/get?path=subscriptions")
      .then(response => {
        // handle success
        this.subscriptions = JSON.parse(response.data).data;
        console.log(this.subscriptions);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });

    axios
      .get("/get?path=customers")
      .then(response => {
        // handle success
        this.customers = JSON.parse(response.data).data;
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  },
  methods: {
    getData: function(path) {
      axios
        .get("/get?path=" + path)
        .then(response => {
          // handle success
          this.response = response.data;
          console.log(this.response);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        })
        .then(function() {
          // always executed
        });
    },

    sendData: function(path, data) {
      axios
        .post("/post?path=" + path, data)
        .then(response => {
          // handle success
          this.response = response.data;
          console.log(this.response);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        })
        .then(function() {
          // always executed
        });
    }
  }
});
