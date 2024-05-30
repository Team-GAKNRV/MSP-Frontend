export class ImageConverterService {
  convertDataURIToBinary(dataURI?: string): Uint8Array {
    if (dataURI != null) {
      const base64Index = dataURI.indexOf(';base64,') + ';base64,'.length;
      const base64 = dataURI.substring(base64Index);
      const raw = window.atob(base64);

      const rawLength = raw.length;
      const array = new Uint8Array(new ArrayBuffer(rawLength));
      for (let i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
      }
      return array;
    } else {
      throw new Error('Data URI is null or undefined.');
    }

  }

  public upload(image: File): Uint8Array {
    const reader = new FileReader();
    let byteArray: Uint8Array = new ImageConverterService().convertDataURIToBinary(String(reader.result));
    if (image) {
      reader.readAsDataURL(image);
    }
    return byteArray;
  }

  //Diese Methode ist nur zum testen da (Bei Fragen an mich wenden (Kevin))
  public getTestImage(): string {
    return "UklGRpQEAABXRUJQVlA4WAoAAAAIAAAAZwEAZwEAVlA4IPADAABQOACdASpoAWgBPm02mUikI6KhI73YGIANiWlu/HyZi8ge3LRkpDUpF9dov2Z4ox+97nD6T0n/8E+311K3vrqVvfXUre+upW99dSt766lb31zAOX/1aVeRECDVyAaceJHQupW99dSt0ou/7+pcVSc0SPEN8nmKCn01axi5KlWzc5S3vfkfoKJ3ri6lb310/ZxpeupstH+7ja2TTUcYuatYp91XafTVPs5D/pq1jFzQURORi5qn5O5vlU+mrWMWacp8qqVve+p6qN5upW99dPaCXJ4ja6fkiji3vrqVvawDaYlje+qsAoBbebXUre+E2dSsp+zjtdSfCmm7tW14F6xNHGLmqdw6jYUaN1ENV+lb311K3WbVMhtgxclKDTbvhGLmrWMXNVJ8ZuH1Jy/ktleatYxc0EHQYllrp69Il0PZpDy1jFzRAA5eJkLz8rzQW1ZKsNxvfXUrIAkspB+4/pq1dG8XEUC+IKes8bXUnqFTGv74QrQ6yvNWsleMz/GwU6lESmAJ5JE/+/v0qMzdXudiqZaxi5q1ioomEhTI8PGR9WLSFgX2WQb311K3vrsBEd4BogA4pS9CNHGLmrWMXOt2LqVvfXUre+upWQAA/vuxAAnQ0tIcoqvosodjsgCB8JHIGvteh91TtlcwhSELgUoTCJxLZnP9j2q8tLaMYIwsfbRTwhyEONL/CGUDT4cf8qKDV4rlla0Gbyck1a2VbQMd9u5iICf8LuGirHso9XybUkXLnhJ85hNhL4ByfEpAB2MIQZeLg1jNJ/CF5j49ph9xe5J0IdFX3uDhIJv0HVpHB1ErGS+KDh8UdjfLXWnPefcqinqcmPd/l9vcDysuP/wXmOS/AILiBWm5lJGW5fi8XDOJRzWQbslPH+sbAH9jig1k1mcWDZyYZhSk8eX7gsQg/sz6Y70+TNjRmliDkB8+yVonw5XMhM49kSFuYg7oH93FFRFNfsXCkTqdXUXIzYEKsR1XM2+XFgYRQlL9h/8+XhOLPQRmTuvrljmVQjHiw1z11JorxgD2H/3/UtcATa8s5EX2/xIkCMHODrbCQB5N7mOinlr1CaZAD6ZvvcQJF2NAgrksIah42YRxCm7FqDf/haXBqbHZo7alQiURIWqzw8mgPC8S1TB+xIqF917/YxvY98NYUVJwGvOU8s98whLT9wEc2XdQ02EgO4dhrOd/QTulcckBWCdCCBgrEbTZE0qx5dwSM0Z9sDl3TTEsbrHq5lnjM4YmrL4dVTfnfxHbak8ZKjFYDSbzFLQ+ak6/WG074tffTXWATP0B9dKpxh2jlzZsBEr1LVvXwFUFPkd1FV0tNy/ktBOh0G2WwAAAAABFWElGfgAAAEV4aWYAAE1NACoAAAAIAAUBEgADAAAAAQABAAABGgAFAAAAAQAAAEoBGwAFAAAAAQAAAFIBKAADAAAAAQACAACHaQAEAAAAAQAAAFoAAAAAAAAASAAAAAEAAABIAAAAAQACoAIABAAAAAEAAAFooAMABAAAAAEAAAFo"
  }
}
