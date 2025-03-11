using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Ornit.Backend.src.Features.Test
{
    [ApiController]
    [Route("api/test")]
    public class TestController : ControllerBase
    {
        [HttpDelete("{prm}")]
        public async Task<ActionResult<List<TestClass>>> Deletee([FromBody] string bodyString, TestEnum prm)
        {
            await Task.Run(() => Console.WriteLine(""));
            return Ok(new TestClass(bodyString, prm.ToString()));
        }

        [HttpPatch("patch/{str}")]
        [Authorize]
        public ActionResult<string> Patch(string str) => Ok(str);

        [HttpGet("get/extra/param")]
        public ActionResult<List<int>> Get() => Ok(null);
    }
}