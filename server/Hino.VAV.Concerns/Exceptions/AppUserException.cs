using System;
using System.Runtime.Serialization;

namespace Hino.VAV.Concerns.Exceptions
{
    /// <inheritdoc />
    /// <summary>
    ///     A user exception should be thrown when it's an exception caused by a business rule, but the user is able to fix the
    ///     request.
    ///     A wrong input value for example
    /// </summary>
    public class AppUserException : AppException
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="AppUserException"/> class.
        /// </summary>
        /// <param name="code">The code.</param>
        /// <param name="message">The message.</param>
        /// <param name="context">The context.</param>
        public AppUserException(string code, string message, object context)
            : base(code, message, context)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="AppUserException"/> class.
        /// </summary>
        /// <param name="code">The code.</param>
        /// <param name="message">The message.</param>
        public AppUserException(string code, string message)
            : base(code, message, null)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="AppUserException"/> class.
        /// </summary>
        /// <param name="code">The code.</param>
        /// <param name="message">The message.</param>
        /// <param name="exception">The exception.</param>
        public AppUserException(string code, string message, Exception exception)
            : base(code, message, null, exception)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="AppUserException"/> class.
        /// </summary>
        protected AppUserException()
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="AppUserException"/> class.
        /// </summary>
        /// <param name="message">The message that describes the error.</param>
        protected AppUserException(string message)
            : base(message)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="AppUserException"/> class.
        /// </summary>
        /// <param name="message">The error message that explains the reason for the exception.</param>
        /// <param name="innerException">The exception that is the cause of the current exception, or a null reference (Nothing in Visual Basic) if no inner exception is specified.</param>
        protected AppUserException(string message, Exception innerException)
            : base(message, innerException)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="AppUserException"/> class.
        /// </summary>
        /// <param name="info">The <see cref="System.Runtime.Serialization.SerializationInfo"></see> that holds the serialized object data about the exception being thrown.</param>
        /// <param name="context">The <see cref="System.Runtime.Serialization.StreamingContext"></see> that contains contextual information about the source or destination.</param>
        protected AppUserException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
        }
    }
}