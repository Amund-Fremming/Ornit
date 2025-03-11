namespace Ornit.Backend.src.Shared.ResultPattern;

public sealed class ResultException(string message) : Exception(message);