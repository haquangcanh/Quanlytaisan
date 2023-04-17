async function newAsset() {
  const AssetName = $("#AssetName").val().trim();
  const Amount = $("#Amount").val();
  const Category = $("#Category").val();
  const assets = await $.ajax({
    url: "/home/requestByAssetNew",
    type: "POST",
    data: {
      AssetName: AssetName,
      Category: Category,
    },
  })
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      alert(error.responseJSON.message);
    });
}

SearchAsset = () => {
  const inp = $(".form-control").val().trim();
  if (inp.length === 0) {
    alert("You must fill the search before you can search!!!");
  } else {
    window.location.href = `/home/find?search=${inp}`;
  }
};

async function log(page, limit) {
  const inp = window.location.href.split("/")[4];
  const res = await $.ajax({
    url: `/home/${inp}&page=${page}&limit=${limit}`,
    type: "GET",
  });
  $(".body").html(res);
}


haDelete = async (id) => {
  try {
    let processed = confirm("Do you want to delete this Asset?");
    if (processed) {
      await $.ajax({
        url: `/home/api/${id}`,
        type: "DELETE",
      });
      window.location.reload();
    }
  } catch (error) {
    alert(error.responseJSON.message);
  }
};

let idAsset1;
opUpdate = async (id) => {
  try {
    idAsset1 = id;
    console.log(28, idAsset1);
    const res = await $.ajax({
      url: `/home/api/${idAsset1}`,
      type: "GET",
    });

    $(".AssetName").val(res.AssetName);
    console.log(res);

  } catch (error) {
    console.log(error);
  }
};


hanUpdate = async () => {
  try {
    const AssetName = $(".AssetName").val().trim();
    const Category = $(".categoryUpDate").val();
    
    await $.ajax({
      url: `/home/api/${idAsset1}`,
      type: "PUT",
      data: {
        AssetName: AssetName,
        Category: Category,
      },
    });
    window.location.reload();

    idAsset1 = 0;
  } catch (error) {
    console.log(error);
  }
};